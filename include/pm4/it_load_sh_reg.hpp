#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItLoadShRegDef {
    static constexpr std::uint8_t opcode = 0x5f;
    static constexpr std::string_view name = "IT_LOAD_SH_REG";
    static constexpr std::string_view desc = "Load shader registers from memory buffer via DMA";
};
}
