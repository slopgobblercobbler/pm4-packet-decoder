#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItReleaseMemTimestampDef {
    static constexpr std::uint8_t opcode = 0x56;
    static constexpr std::string_view name = "IT_RELEASE_MEM_TIMESTAMP";
    static constexpr std::string_view desc = "Write GPU 64-bit hardware timestamp upon memory release";
};
}
