#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItEventWriteEosDef {
    static constexpr std::uint8_t opcode = 0x51;
    static constexpr std::string_view name = "IT_EVENT_WRITE_EOS";
    static constexpr std::string_view desc = "Emit GPU end-of-shader synchronization event";
};
}
