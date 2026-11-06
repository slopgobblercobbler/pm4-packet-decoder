#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItEventWriteMultiDef {
    static constexpr std::uint8_t opcode = 0x59;
    static constexpr std::string_view name = "IT_EVENT_WRITE_MULTI";
    static constexpr std::string_view desc = "Emit multiple hardware pipeline synchronization events";
};
}
